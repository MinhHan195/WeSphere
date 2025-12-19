import React, { useEffect, useState } from "react";
import { $api } from "../../services/service";
import { setLoading, setAlert } from "../../redux/authSlide";
import { useDispatch } from "react-redux";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import Feed from "../../components/Elements/Feed/Feed";
import style from "./Saved.module.css";
const Saved = () => {
    const dispatch = useDispatch();
    const [listFeed, setListFeed] = useState([]);
    const [listIdx, setListIdx] = useState([]);

    const fetchData = async () => {
        dispatch(setLoading(true));
        try {
            const res = await $api.post.getListSavedPost();
            if (!res.isError) {
                // console.log(res.data);
                setListFeed(res.data);
                dispatch(setLoading(false));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error.errors?.exceptionMessage || error.message,
                })
            );
        }
    };

    const changeListIdx = async (feedId) => {
        setListIdx((prev) => [...prev, feedId]);
    };

    useEffect(() => {
        const list = new Set(listIdx.map((i) => i?.id));
        setListFeed((prev) => {
            return prev.filter((item) => !list.has(item?.feed?.id));
        });

        console.log(listIdx);
    }, [listIdx]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <DefaultLayout>
            <div className="d-flex flex-column align-items-center w-100 h-100 py-5">
                <div className={style.header}>
                    <strong>Đã lưu</strong>
                </div>
                <div className={`${style.save_container} shadow-sm rounded-4`}>
                    {listFeed
                        ? listFeed.map((feed, idx) => {
                              return (
                                  <>
                                      <div
                                          className={style.feed_card}
                                          key={feed.feed.id}
                                      >
                                          <Feed
                                              data={feed}
                                              idx={idx}
                                              block={changeListIdx}
                                          />
                                      </div>
                                      {idx < listFeed.length - 1 ? (
                                          <hr className={style.line} />
                                      ) : null}
                                  </>
                              );
                          })
                        : null}
                </div>
            </div>
        </DefaultLayout>
    );
};
export default Saved;
