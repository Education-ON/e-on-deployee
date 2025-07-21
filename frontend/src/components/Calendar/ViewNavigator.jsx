import styles from "../../styles/Calendar/ViewNavigator.module.css";
import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ViewContext } from "../../contexts/ViewContext";
import { SearchTypeContext } from "../../contexts/SearchTypeContext";
import { CurrentDateContext } from "../../contexts/CurrentDateContext";
import extractCityName from "../../utils/extractCityNameUtil";
import { saveMySchool, deleteMySchool, getMySchool } from "../../api/schoolApi";
import star from "../../assets/star.png";
// import star_gray from "../../assets/star_gray.png";
import star_filled from "../../assets/star_filled.png";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const ViewNavigator = () => {
    const { selectedValue, currentView, setCurrentView, currentSchoolCode } =
        useContext(ViewContext);
    const { searchType, setSearchType, schoolAddress } =
        useContext(SearchTypeContext);
    const { currentDate, setCurrentDate } = useContext(CurrentDateContext);
    const [mySchoolCode, setMySchoolCode] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // 로그인된 경우에만 userId 사용
    const userId = user?.user_id;
    // console.log(userId);

    const handleViewTypeChange = (event) => {
        setCurrentView(event.target.value);
    };

    useEffect(() => {
        if (searchType.year === "prev") {
            // currentDate를 1년 전으로 변경
            setCurrentDate(currentDate.subtract(1, "year"));
        } else {
            // 올해(현재 날짜)로 복원
            setCurrentDate(dayjs());
        }
    }, [searchType.year]);

    useEffect(() => {
        const fetchMySchool = async () => {
            if (!userId) return; // 로그인하지 않은 경우에는 조회하지 않음

            try {
                const res = await getMySchool(userId);
                setMySchoolCode(res.data?.schoolCode);
            } catch (err) {
                console.error("나의 학교 조회 실패", err);
            }
        };

        fetchMySchool();
    }, [searchType, selectedValue, userId]);

    const isMySchool = useMemo(() => {
        return mySchoolCode === currentSchoolCode;
    }, [mySchoolCode, currentSchoolCode]);

    const cityName =
        searchType.type === "school" && schoolAddress
            ? extractCityName(schoolAddress)
            : "";

    const clickStarHandler = async () => {
        if (!userId) {
            const confirmed = window.confirm("로그인 후 이용해주세요.");
            if (confirmed) {
                navigate("/login"); // 로그인 페이지 경로로 이동
            }
            return;
        }

        if (!currentSchoolCode) {
            console.warn("currentSchoolCode가 없습니다.");
            return;
        }

        // console.log(
        //     "clickStarHandler 호출 - userId:",
        //     userId,
        //     "schoolCode:",
        //     currentSchoolCode
        // );

        try {
            if (isMySchool) {
                // 현재 학교가 나의 학교인 경우 삭제
                await deleteMySchool(userId);
                setMySchoolCode(null);
                toast("나의 학교를 삭제했습니다.", {
                    icon: "💜",
                    className: "my-toast",
                    progressClassName: "custom-progress-bar",
                });
            } else if (mySchoolCode) {
                // 다른 학교가 나의 학교인 경우
                const confirmed = window.confirm(
                    `다른 학교가 이미 나의 학교로 저장되어 있습니다. 나의 학교를 ${selectedValue}로 변경하시겠습니까?`
                );
                if (confirmed) {
                    await deleteMySchool(userId);
                    await saveMySchool(userId, currentSchoolCode);
                    setMySchoolCode(currentSchoolCode);
                    toast(`나의 학교가 ${selectedValue}로 변경되었습니다.`, {
                        icon: "💜",
                        className: "my-toast",
                        progressClassName: "custom-progress-bar",
                    });
                }
            } else {
                await saveMySchool(userId, currentSchoolCode);
                setMySchoolCode(currentSchoolCode);
                toast("나의 학교를 저장했습니다.", {
                    icon: "💜",
                    className: "my-toast",
                    progressClassName: "custom-progress-bar",
                });
            }
        } catch (err) {
            console.error("내 학교 저장/삭제 실패", err);
        }
    };

    console.log("searchType:", searchType);

    return (
        <div className={styles.viewNavigator}>
            <div className={styles.left}>
                {searchType.type === "school" ? (
                    <img
                        src={isMySchool ? star_filled : star}
                        alt="star"
                        className={styles.star}
                        onClick={clickStarHandler}
                    />
                ) : null}
                <div
                    className={
                        searchType.type === "school"
                            ? styles.name
                            : styles.name_region
                    }>
                    {selectedValue} {cityName && ` (${cityName})`}
                </div>
                <div className={styles.text}>학사일정</div>
                <div className={styles.selectGrade}>
                    <select
                        className={styles.select}
                        onChange={(e) => {
                            const selectedGrade = parseInt(e.target.value, 10); // 문자열 → 10진법 숫자
                            setSearchType((prev) => ({
                                ...prev,
                                grade: selectedGrade,
                            }));
                        }}
                        value={searchType.grade || 1} // 초기값 세팅
                    >
                        {[1, 2, 3, 4, 5, 6]
                            .filter((grade) =>
                                searchType.schoolType === "middle"
                                    ? grade <= 3
                                    : true
                            )
                            .map((grade) => (
                                <option key={grade} value={grade}>
                                    {grade}
                                </option>
                            ))}
                    </select>
                    <span className={styles.selectText}>학년</span>
                </div>
                <div
                    className={styles.chooseYearView}
                    onClick={() => {
                        if (searchType.type === "region") {
                            setSearchType((prev) => ({
                                ...prev,
                                schoolType:
                                    prev.schoolType === "elementary"
                                        ? "middle"
                                        : "elementary",
                            }));
                        } else {
                            setSearchType((prev) => ({
                                ...prev,
                                year: prev.year === "prev" ? null : "prev",
                            }));
                        }
                    }}>
                    {searchType.type === "region"
                        ? searchType.schoolType === "elementary"
                            ? "→ 중학교 학사일정 보러가기"
                            : "→ 초등학교 학사일정 보러가기"
                        : searchType.year === "prev"
                        ? "→ 올해 학사일정 보러가기"
                        : "→ 작년 학사일정 보러가기"}
                </div>
            </div>
            <div className={styles.viewRadio}>
                <label>
                    <input
                        type="radio"
                        name="viewType"
                        value="monthly"
                        checked={currentView == "monthly"}
                        onChange={handleViewTypeChange}
                    />
                    한달 보기
                </label>
                <label>
                    <input
                        type="radio"
                        name="viewType"
                        value="weekly"
                        checked={currentView === "weekly"}
                        onChange={handleViewTypeChange}
                    />
                    일주일 보기
                </label>
            </div>
        </div>
    );
};

export default ViewNavigator;
