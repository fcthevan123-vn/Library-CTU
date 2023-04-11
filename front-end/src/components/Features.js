import React from "react";
import "./Features.css";

function Features() {
  return (
    <div>
      <div className="container px-4 py-4" id="featured-3">
        <h2 className="pb-2 border-bottom text-center fs-22">
          Mượn sách thật dễ dàng !
        </h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-wrapper">
              <div className="d-flex justify-content-center w-100">
                <div
                  className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded"
                  height={80}
                  width={80}
                >
                  <i
                    style={{
                      width: "48px",
                      textAlign: "center",
                    }}
                    className="fa-solid fa-bolt fa-beat-fade"
                  ></i>
                </div>
              </div>
              <h3 className="fs-18 text-center">Nhanh chóng</h3>
              <p className="fs-14 text-description">
                Trang quản lý thư viện của chúng tôi được thiết kế để đáp ứng
                nhu cầu của người dùng với tốc độ nhanh chóng. Bạn có thể tìm
                kiếm sách một cách dễ dàng và mượn sách chỉ trong vài cú nhấp
                chuột. Hãy mượn sách ngay
              </p>
            </div>
          </div>
          <div className="feature col">
            <div className="feature-wrapper">
              <div className="d-flex justify-content-center w-100">
                <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded">
                  <i
                    style={{
                      width: "48px",
                      textAlign: "center",
                    }}
                    className="fa-solid fa-signs-post fa-beat-fade"
                  ></i>
                </div>
              </div>
              <h3 className="fs-18 text-center ">Dễ dàng</h3>
              <p className="fs-14 text-description">
                Các chức năng trên trang web quản lý thư viện của chúng tôi được
                thiết kế đơn giản và dễ sử dụng. Người dùng có thể dễ dàng tìm
                kiếm sách và lựa chọn các tùy chọn mượn sách phù hợp với nhu cầu
                của mình.
              </p>
            </div>
          </div>
          <div className="feature col">
            <div className="feature-wrapper">
              <div className="d-flex justify-content-center w-100">
                <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded">
                  <i
                    style={{
                      width: "48px",
                      textAlign: "center",
                    }}
                    className="fa-solid fa-book-bookmark fa-beat-fade"
                  ></i>
                </div>
              </div>
              <h3 className="fs-18 text-center ">Có nhiều thể loại sách</h3>
              <p className="fs-14 text-description">
                Thư viện của chúng tôi cung cấp nhiều thể loại sách khác nhau để
                đáp ứng nhu cầu đa dạng của độc giả. Bạn có thể tìm kiếm sách
                theo tác giả, thể loại hoặc từ khóa để tìm kiếm sách một cách dễ
                dàng và nhanh chóng.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-4" id="featured-3">
        <h2 className="pb-2 border-bottom text-center fs-22">
          Quản lý thông minh !
        </h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-wrapper">
              <div className="d-flex justify-content-center w-100">
                <div
                  className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded"
                  height={80}
                  width={80}
                >
                  <i
                    style={{
                      width: "48px",
                      textAlign: "center",
                    }}
                    className="fa-solid fa-bars fa-beat-fade"
                  ></i>
                </div>
              </div>
              <h3 className="fs-18 text-center">Toàn diện</h3>
              <p className="fs-14 text-description">
                Trang quản lý thư viện của chúng tôi cung cấp một giải pháp quản
                lý sách toàn diện, giúp quản lý các thông tin về sách, tài liệu,
                độc giả, nhân viên và các hoạt động liên quan đến thư viện một
                cách chính xác và dễ dàng.
              </p>
            </div>
          </div>
          <div className="feature col">
            <div className="feature-wrapper">
              <div className="d-flex justify-content-center w-100">
                <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded">
                  <i
                    style={{
                      width: "48px",
                      textAlign: "center",
                    }}
                    className="fa-solid fa-eye fa-beat-fade"
                  ></i>
                </div>
              </div>
              <h3 className="fs-18 text-center">Trực quan</h3>
              <p className="fs-14 text-description">
                Giao diện trang quản lý thư viện được thiết kế trực quan, dễ sử
                dụng và có khả năng tương tác cao giữa người dùng và hệ thống.
                Người dùng có thể dễ dàng quản lý thông tin, tạo ra các báo cáo
                và thống kê một cách chính xác và dễ dàng.
              </p>
            </div>
          </div>
          <div className="feature col">
            <div className="feature-wrapper">
              <div className="d-flex justify-content-center w-100">
                <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded">
                  <i
                    style={{
                      width: "48px",
                      textAlign: "center",
                    }}
                    className="fa-brands fa-dropbox fa-beat-fade"
                  ></i>
                </div>
              </div>
              <h3 className="fs-18 text-center">Kiểm soát</h3>
              <p className="fs-14 text-description">
                Trang quản lý thư viện của chúng tôi có khả năng kiểm soát cao
                với các chức năng giám sát và báo cáo tự động. Người quản lý có
                thể kiểm tra và theo dõi các hoạt động mượn, cập nhật thông tin
                sách, độc giả và nhân viên một cách dễ dàng và chính xác.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
