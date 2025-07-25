const db = require('../models');
const User = db.User;
const Board = db.Board;
const Post = db.Post;
const Comment = db.Comment;

// 게시판 상세 조회
async function getBoardList(board_id) {
    try {
        const boards = await Board.findAll({
            where: { board_id },
        });

        return boards;
    } catch (error) {
        console.error("게시판 조회 실패:", error.message);
        throw error;
    }
};

// 게시글 목록 조회
async function getBoardPost(board_id) {
    try {
        const boardPosts = await Post.findAll({
            attributes: [ 'post_id', 'title', 'created_at', 'user_id'],
            where: { board_id },
            order: [['created_at', 'DESC']],
            limit: 10,                         // 최대 10개만
            include: [{
                model: User,
                attributes: ['name'],      // 작성자 닉네임
            }]
        });

        return boardPosts;
    } catch (error) {
        console.error("게시판 목록 조회 실패:", error.message);
        throw error;
    }
};

// 게시글 상세 조회
async function getPostWithComments(post_id) {
    return await Post.findOne({
        where: { post_id },
        include: [{
            model: User,
            attributes: ['name']
            },
            {
                model: Comment,
                attributes: [ 'comment_id', 'content', 'created_at', 'user_id'],
                include: [{
                    model: User,
                    attributes: ['name', 'user_id'],
                }]
            }
        ]
    });
};


module.exports = {
    getBoardList,
    getBoardPost,
    getPostWithComments,
};