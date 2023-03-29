import React from "react";
import Footer from "../components/Footer";
import "./Intro.css";
export default function Intro() {
  localStorage.removeItem("toastShowed");

  return (
    <div className="intro-wrapper">
      <div className="container intro-container">
        <div className="row ">
          <h3 className="fs-22 ">Giới thiệu về thư viện CTU</h3>
        </div>
        <div className="row row-intro mt-3">
          <div className="col col-text">
            <h4 className="fs-18 fa-beat">Giới thiệu</h4>
            <p className="text-start fs-14">
              Trung tâm Học liệu - trường Đại học Cần Thơ, tiền thân là Thư viện
              Trung tâm trường Đại học Cần Thơ được Tổ chức từ thiện Atlantic
              Philanthropies ( Mỹ ) tài trợ xây dựng mới trên cơ sở chuyển
              khoảng 70% vốn tài liệu và toàn bộ cán bộ của Thư viện Trung tâm
              sang Trung tâm Học liệu.
            </p>
            <p className="text-start fs-14">
              Trung tâm Học liệu được tọa lạc trên diện tích đất 7.560 m2 ngay
              lối vào cổng chính của khu II, Đại học Cần Thơ, một địa điểm lý
              tưởng thuận tiện cho khách hàng đến sử dụng Trung tâm Học liệu để
              phục vụ cho việc học tập và nghiên cứu. Trung tâm Học liệu được
              xây dựng 4 tầng với tổng diện tích sử dụng là 7.200m2 . Trung tâm
              Học liệu được thiết kế xây dựng và sắp xếp mỗi tầng của tòa nhà
              rất hấp dẫn và khoa học phù hợp cho từng góc học tập, nghiên cứu,
              làm việc độc lập và theo nhóm. Đặt biệt là sự bố trí một cách khoa
              học dây chuyền hoạt động tổ chức, điều hành và phục vụ khách hàng,
              tạo sự linh hoạt và dễ dàng cho khách hàng đến sử dụng Trung tâm
              học liệu.
            </p>
          </div>
          <div className="col col-img-intro">
            <img
              src="https://res.cloudinary.com/dvvg4xwoy/image/upload/v1679753599/332480986_1361693997953826_476625999413661845_n.jpg_evunah.jpg"
              className="img-intro"
            ></img>
          </div>
        </div>
        <div className="row row-intro mt-5">
          <div className="col col-text ">
            <h4 className="fs-18 fa-beat">Chức năng</h4>
            <p className="text-start fs-14">
              Tham mưu, giúp Hiệu trưởng và các Phó Hiệu trưởng thực hiện công
              tác thu thập, tổ chức, khai thác, lưu trữ và cung cấp các dịch vụ
              thông tin tư liệu phục vụ công tác giảng dạy, học tập và nghiên
              cứu khoa học cho công chức, viên chức, người lao động và sinh viên
              đang công tác, học tập tại Trường và các đối tượng khác có nhu
              cầu.
            </p>
          </div>

          <div className="col col-img-intro ">
            <img
              src="https://res.cloudinary.com/dvvg4xwoy/image/upload/v1679753408/332522007_1564875880645879_7455697277753212294_n.jpg_k1iqgf.jpg"
              className="img-intro"
            ></img>
          </div>
        </div>

        <div className="row row-intro my-5">
          <div className="col col-text ">
            <h4 className="fs-18 fa-beat">Nhiệm vụ</h4>
            <p className="text-start fs-14">
              1. Phục vụ nhu cầu tham khảo và nghiên cứu tài liệu học thuật
              trong học tập, giảng dạy và nghiên cứu khoa học cho vùng Đồng bằng
              sông Cửu Long.
            </p>
            <p className="text-start fs-14">
              2. Phối hợp với Phòng Đào tạo đề xuất bổ sung giáo trình, tài liệu
              tham khảo đối với những học phần chưa có, có ít hoặc giáo trình
              lạc hậu.
            </p>
            <p className="text-start fs-14">
              3. Bảo đảm an ninh mạng trong các liên kết tìm kiếm thông tin khoa
              học thuộc phạm vi quản lý của đơn vị.
            </p>
            <p className="text-start fs-14">
              4. Hướng dẫn nghiệp vụ thư viện và bổ sung nguồn tài nguyên thông
              tin cho hệ thống thư viện trường Đại học Cần Thơ.
            </p>
          </div>

          <div className="col col-img-intro ">
            <img
              src="https://res.cloudinary.com/dvvg4xwoy/image/upload/v1679753599/332480986_1361693997953826_476625999413661845_n.jpg_evunah.jpg"
              className="img-intro"
            ></img>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
