const boardService = require("../services/boardService");
const db = require('../models');
const User = db.User;
const Board = db.Board;
const Post = db.Post;
const Comment = db.Comment;
const BoardRequest = db.BoardRequest;
const Report = db.Report;

// 게시판 조회 1
exports.getBoardList = async (req, res) => {
  try {
    let boardCondition = {};

    if (req.isAuthenticated && req.isAuthenticated()) {
      const userType = req.user.type;

      if (userType === 'admin') {
        // 관리자: 모든 게시판 조회
        boardCondition = {};
      } else {
        // 일반 유저: 자신 + 공용 게시판
        boardCondition = {
          board_audience: [userType, 'all']
        };
      }
    } else {
      // 비로그인 유저: 공용 게시판만
      boardCondition = { board_audience: 'all' };
    }

    const boards = await Board.findAll({
      where: boardCondition,
      attributes: ['board_id', 'board_name', 'board_type', 'board_audience'],
      order: [['board_id', 'ASC']]
    });

    res.status(200).json(boards);
  } catch (error) {
    console.error('게시판 목록 조회 실패:', error);
    res.status(500).json({ message: '게시판 목록 조회 실패' });
  }
};



// 게시판 조회 2
exports.getBoard = async (req, res) => {
    try {
        const { board_id } = req.params;

        const board = await boardService.getBoardList(board_id);
        res.json(board);

    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "게시판 조회 실패"});
    }
};

// 게시판의 게시글 목록 조회
exports.getBoardPost = async (req, res) => {
    try {
        const { board_id } = req.params;

        const boardPost = await boardService.getBoardPost(board_id);
        res.json(boardPost);

    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "게시판 목록 조회 실패"});
    }
};

// 게시글 상세 조회
exports.getPost = async (req, res) => {
    const { post_id } = req.params;

    try {
        const post = await boardService.getPostWithComments(post_id);

        if (!post) {
            return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "게시글 조회 실패" });
    }
};


// 게시글 작성
exports.createPost = async (req, res) => {
  const { board_id } = req.params;
  const user_id = req.user.user_id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'title, content는 필수입니다.' });
  }

  try {
    const newPost = await Post.create({
      board_id,
      user_id,
      title,
      content,
    });

    res.status(201).json({ message: '게시글 작성 성공', post: newPost });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '게시글 작성 중 오류가 발생했습니다.' });
  }
};


// 게시글 수정
exports.updatePost = async (req, res) => {
  const { post_id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: '제목과 내용을 모두 입력해야 합니다.' });
  }

  try {
    const post = await Post.findOne({ where: { post_id } });

    if (!post) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    // 작성자 본인 또는 관리자만 삭제 가능
    const isOwner = post.user_id === req.user.user_id;
    const isAdmin = req.user.type === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: '본인의 게시글만 수정할 수 있습니다.' });
    }

    await Post.update({ title, content }, { where: { post_id } });

    const updatedPost = await Post.findOne({ where: { post_id } });

    res.status(200).json({ message: '게시글 수정 성공', post: updatedPost });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '게시글 수정 중 오류가 발생했습니다.' });
  }
};


// 게시글 삭제
exports.deletePost = async (req, res) => {
  const { post_id } = req.params;

  try {
    const post = await Post.findOne({ where: { post_id } });

    if (!post) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    // 작성자 본인 또는 관리자만 삭제 가능
    const isOwner = post.user_id === req.user.user_id;
    const isAdmin = req.user.type === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: '게시글을 삭제할 권한이 없습니다.' });
    }

    await Post.destroy({ where: { post_id } });

    res.status(200).json({ message: '게시글 삭제 성공' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '게시글 삭제 중 오류가 발생했습니다.' });
  }
};


// 댓글 작성
exports.createComment = async (req, res) => {
  const { post_id } = req.params;
  const user_id = req.user.user_id;
  const { content, parent_comment_id } = req.body; // parent_comment_id 추가함

  if (!user_id || !content) {
    return res.status(400).json({ error: 'user_id와 content는 필수입니다.' });
  }

  try {
    const newComment = await Comment.create({
      post_id,
      user_id,
      content,
      parent_comment_id: parent_comment_id || null,
    });

    res.status(201).json({ message: '댓글 작성 성공', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '댓글 작성 중 오류가 발생했습니다.' });
  }
};


// 댓글 수정
exports.updateComment = async (req, res) => {
  const { comment_id } = req.params;
  const user_id = req.user.user_id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: '수정할 댓글 내용이 필요합니다.' });
  }

  try {
    const comment = await Comment.findOne({ where: { comment_id } });

    // 작성자 본인 또는 관리자만 삭제 가능
    const isOwner = comment.user_id === req.user.user_id;
    const isAdmin = req.user.type === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: '본인의 댓글만 수정할 수 있습니다.' });
    }

    if (!comment) {
      return res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });
    }

    if (comment.user_id !== user_id) {
      return res.status(403).json({ error: '본인의 댓글만 수정할 수 있습니다.' });
    }

    await Comment.update(
      { content },
      { where: { comment_id } }
    );

    const updatedComment = await Comment.findOne({ where: { comment_id } });

    res.status(200).json({ message: '댓글 수정 성공', comment: updatedComment });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '댓글 수정 중 오류가 발생했습니다.' });
  }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;

  try {
    const comment = await Comment.findOne({ where: { comment_id } });

    if (!comment) {
      return res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });
    }

    // 작성자 본인 또는 관리자만 삭제 가능
    const isOwner = comment.user_id === req.user?.user_id;
    const isAdmin = req.user?.type === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: '댓글을 삭제할 권한이 없습니다.' });
    }

    await Comment.destroy({ where: { comment_id } });

    res.status(200).json({ message: '댓글 삭제 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '댓글 삭제 중 오류가 발생했습니다.' });
  }
};



// 게시판 개설 요청
exports.createBoardRequest = async (req, res) => {
    const user_id = req.user.user_id;
    const { requested_board_name, requested_board_type, board_audience, request_reason } = req.body;

    if (!user_id || !requested_board_name) {
        return res.status(400).json({ error: 'user_id와 requested_board_name은 필수입니다.'});
    }

    try {
        const newRequest = await BoardRequest.create({
            user_id,
            requested_board_name,
            requested_board_type,
            board_audience,
            request_reason,
            request_date: new Date(),
            request_status: '대기',
        });
        res.status(201).json({
            message: '게시판 개설 신청이 접수되었습니다.',
            boardrequest: newRequest
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '게시판 개설 신청 중 오류가 발생했습니다.' });
    }
};

// 게시판 개설 신청 목록 조회
exports.getAllBoardRequests = async (req, res) => {
  console.log("✅ [getAllBoardRequests] 요청 도달");
    try {
        const requests = await BoardRequest.findAll({
            include: {
                model: User,
                required: false,
                attributes: ['user_id', 'name']
            },
            order: [['request_date', 'DESC']],
        });
        console.log(requests);
        res.status(200).json({ requests });

    } catch (error) {
        console.error(error);
        res.status(500).json({error: '게시판 신청 목록 조회 중 오류 발생'});
    }
};

// 게시판 개설 승인
exports.updateBoardRequestStatus = async (req, res) => {
  const { request_id } = req.params;
  const { request_status } = req.body;

  try {
    const request = await BoardRequest.findOne({ where: { request_id } });

    if (!request) {
      return res.status(404).json({ error: '해당 신청 내역을 찾을 수 없습니다.' });
    }

    await BoardRequest.update(
      { request_status },
      { where: { request_id } }
    );

    // 게시판 개설 승인 시 board 테이블에 게시판 생성
    if (request_status == 'approved') {
      const requested_board_name = request.requested_board_name;
      const requested_board_type = request.requested_board_type;
      const board_audience = request.board_audience;
      await Board.create({
        board_name: requested_board_name,
        board_type: requested_board_type,
        board_audience: board_audience,
        created_at: new Date(),
      });
    }

    res.status(200).json({message: `게시판 신청이 '${request_status}' 처리되었습니다.`});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '상태 변경 중 오류가 발생했습니다.' });
  }
};

//게시글 댓글 신고 api
exports.createReport = async (req, res) => {
  try {
    const { report_type, post_id, comment_id, reason, reporter_id } = req.body;

    if (!['post', 'comment'].includes(report_type)) {
      return res.status(400).json({ message: 'Invalid report_type. Must be "post" or "comment".' });
    }

    if (!reason || !reporter_id || (report_type === 'post' && !post_id) || (report_type === 'comment' && !comment_id)) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // 존재 여부 확인
    // if (report_type === 'post') {
    //   const post = await Post.findByPk(post_id);
    //   if (!post) return res.status(404).json({ message: 'Post not found.' });
    // } else {
    //   const comment = await Comment.findByPk(comment_id);
    //   if (!comment) return res.status(404).json({ message: 'Comment not found.' });
    // }

    // 신고 저장
    const report = await Report.create({
      report_type,
      post_id: report_type === 'post' ? post_id : null,
      comment_id: report_type === 'comment' ? comment_id : null,
      reason,
      reporter_id
    });

    res.status(201).json({ message: '신고가 접수되었습니다.', report });
  } catch (err) {
    console.error('신고 등록 오류:', err);
    res.status(500).json({ message: '서버 오류로 신고에 실패했습니다.' });
  }
};

// 신고 게시글 댓글 조회 api
exports.getAllReports = async (req, res) => {
  try {
    const { report_type } = req.query;

    // 관리자인지 확인
    if (!req.user || req.user.type !== "admin") {
      return res.status(403).json({ message: "관리자 권한이 필요합니다." });
    }

    const whereClause = {};
    if (report_type === "post") {
      whereClause.post_id = { [Op.not]: null };
    } else if (report_type === "comment") {
      whereClause.comment_id = { [Op.not]: null };
    }

    const reports = await Report.findAll({
      where: whereClause,
      include: [
        { model: User, attributes: ["user_id", "name"] },
        { model: Post, attributes: ["post_id", "title", "content"], required: false },
        { model: Comment, attributes: ["comment_id", "content"], required: false },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(reports);
  } catch (error) {
    console.error("신고 조회 실패:", error);
    res.status(500).json({ message: "신고 목록 조회 중 오류 발생" });
  }
};