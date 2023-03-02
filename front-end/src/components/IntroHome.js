import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import "./IntroHome.css";

function IntroHome() {
  const user = useSelector((state) => state.user);

  return (
    <div className="py-3">
      <div className="px-4 py-1 my-5 text-center ">
        {/* logo CTU */}
        <img
          className="d-block mx-auto mb-4 border border-dark-subtle rounded-pill shadow  mb-5 bg-body-tertiary"
          src="data:image/png;base64,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"
          alt=""
          height={140}
          width={580}
        />
        <h1 className="display-5 fw-bold title-home">
          Thư viện Trường Đại học Cần Thơ
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Mượn sách một cách nhanh chóng, dễ dàng và rất tiện ích!
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            {/* check user */}
            {user ? (
              <LinkContainer to="/all-book">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4 gap-3"
                >
                  Mượn sách ngay
                </button>
              </LinkContainer>
            ) : (
              <LinkContainer to="/login">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4 gap-3"
                >
                  Mượn sách ngay
                </button>
              </LinkContainer>
            )}
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              <a
                href="https://lrc.ctu.edu.vn/index.php/aboutus/intro"
                target="_blank"
                className="link-to-ctu text-secondary"
              >
                Xem thông tin về chúng tôi
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroHome;
