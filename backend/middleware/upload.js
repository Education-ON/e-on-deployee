const multer = require("multer");
const path   = require("path");

// 1) 저장 장소 & 파일명 지정
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");                 // uploads 폴더에 저장
  },
  filename: (_req, file, cb) => {
    const ext      = path.extname(file.originalname); // .jpg
    const basename = path.basename(file.originalname, ext);
    const unique   = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${basename}-${unique}${ext}`);          // img-12345.jpg
  },
});

// 2) 필터: 이미지만 통과
const fileFilter = (_req, file, cb) => {
  const mime = file.mimetype;
  if (mime.startsWith("image/")) cb(null, true);
  else cb(new Error("이미지 파일만 업로드 가능"));
};

// 3) 크기 제한: 5 MB
module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
