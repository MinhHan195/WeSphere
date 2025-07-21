import React, { useState } from "react";
import style from "./ModalConfirm.module.css";

import { useDispatch } from "react-redux";
import { setModal } from "../../../../redux/createSLide";

const ModalConfirm = (props) => {
  const [showModal, setShowModal] = useState(props.show || false);
  const dispatch = useDispatch();

  const handleSave = () => {
    props.onSave();
    dispatch(setModal(false));
    setShowModal(false);
  };

  const handleUnSave = () => {
    dispatch(setModal(false));
    setShowModal(false);
  };

  const handleCancel = () => {
    props.closeConfirmModal();
    setShowModal(false);
  };
  return (
    <div
      className={`${style.modal_background} ${
        showModal ? style.show_confirm_modal : style.hide_confirm_modal
      }`}
    >
      <div className={style.modal_confirm_dialog}>
        <div className={`rounded-4 ${style.modal_confirm_container}`}>
          <div className={style.modal_confirm_header}>
            <p className="fw-bold p-0 m-0 mb-3">Lưu làm bản nháp?</p>
            <p className="fw-light text-center text-body-tertiary p-0 m-0">
              Lưu bản nháp để chỉnh sửa và đăng vào lúc khác.
            </p>
          </div>
          <div className={style.modal_confirm_body}>
            <div className={style.modal_confirm_body_item} onClick={handleSave}>
              <p className="m-0 p-0 fw-bold">Lưu</p>
            </div>
            <div
              className={style.modal_confirm_body_item}
              onClick={handleUnSave}
            >
              <p className="m-0 p-0 fw-semibold text-danger">Không Lưu</p>
            </div>
            <div
              className={style.modal_confirm_body_item}
              onClick={handleCancel}
            >
              <p className="m-0 p-0">Hủy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalConfirm;
