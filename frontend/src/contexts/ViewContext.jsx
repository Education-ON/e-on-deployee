// ViewContext.js
import { createContext, useContext, useEffect, useState, useRef } from "react";
import {
    searchSchoolsByName,
    searchSchoolBySchoolCode,
    getAllSchoolSchedule,
    getMySchool,
} from "../api/schoolApi";
import {
    searchRegionById,
    searchAverageScheduleByGrade,
} from "../api/regionApi";
import { SearchTypeContext } from "./SearchTypeContext";
import { AuthContext } from "./AuthContext";
import styles from "../styles/Common/ViewContext.module.css"

export const ViewContext = createContext();

const ViewProvider = ({ children }) => {
    const { searchType, setSchoolAdress } = useContext(SearchTypeContext);
    const { user } = useContext(AuthContext);

    const [currentView, setCurrentView] = useState("monthly");
    // const [selectedValue, setSelectedValue] = useState("");
    // 선택된 값을 type 별로 분리
    const [selectedSchoolName, setSelectedSchoolName] = useState("");
    const [selectedRegionName, setSelectedRegionName] = useState("");
    const [schedules, setSchedules] = useState(null);
    const [currentSchoolCode, setCurrentSchoolCode] = useState({
        code: null,
        type: searchType.type,
    });

    // 로딩 기다림
    const [isInitialized, setIsInitialized] = useState(false);
    const hasInitialized = useRef(false); // 초기화 여부
    // const isInitialMount = useRef(true);

    const selectedValue =
        searchType.type === "school" ? selectedSchoolName : selectedRegionName;

    const setSelectedValue =
        searchType.type === "school"
            ? setSelectedSchoolName
            : setSelectedRegionName;

    useEffect(() => {
        // console.log("🔥 타입 바뀜 → 초기화 재시작");
        hasInitialized.current = false;
    }, [searchType.type]);

    useEffect(() => {
        const fetchDefaultSchedule = async () => {
            const { type, year, grade } = searchType;

            try {
                // 이미 초기화된 경우 진행하지 않음
                if (hasInitialized.current) return;

                // 1. 로그인 상태이고, 나의 학교 설정이 존재할 경우
                if (user?.user_id) {
                    // console.log(type);
                    const mySchoolRes = await getMySchool(type);

                    if (mySchoolRes?.data?.code) {
                        // console.log(mySchoolRes.data.code);
                        setCurrentSchoolCode({
                            code: mySchoolRes.data.code,
                            type,
                        });
                        // console.log("나의 학교 코드:", mySchoolRes.data.code);

                        if (type === "school") {
                            const schoolData = await searchSchoolBySchoolCode(
                                mySchoolRes.data.code
                            );

                            // console.log("data: ", schoolData);

                            const schoolName = schoolData.data[0].name;
                            const atptCode = schoolData.data[0].atptCode;

                            const scheduleRes = await getAllSchoolSchedule(
                                mySchoolRes.data.code,
                                atptCode,
                                year,
                                grade
                            );

                            setSelectedSchoolName(schoolName);
                            setSchedules(scheduleRes.data);
                        } else {
                            const region = await searchRegionById(
                                mySchoolRes.data.code
                            );
                            const regionName = region?.data.data.region_name;

                            // console.log("regionName: ", regionName);

                            const scheduleRes = grade
                                ? await searchAverageScheduleByGrade(
                                      regionName,
                                      grade
                                  )
                                : await searchAverageScheduleByGrade(
                                      regionName
                                  );

                            setSelectedRegionName(regionName);
                            setSchedules(scheduleRes.data.data);
                        }

                        hasInitialized.current = true; // 초기화 완료
                        setIsInitialized(true);
                        return; // 나의 학교 정보로 세팅 완료했으니 종료
                    }
                    // console.log("code 없음, 기본값으로 대체");
                }
            } catch (err) {
                console.warn("나의 학교 조회 실패, 기본값으로 대체합니다", err);
            }

            // console.log("============기본 대체 중===========");
            // 2. 로그인 안 했거나, 나의 학교 정보 없을 때 기본값 세팅
            if (type === "school") {
                const defaultSchoolName = "가락중학교";
                setSelectedSchoolName(defaultSchoolName);
                const school = await searchSchoolsByName(defaultSchoolName);
                const schoolCode = school.data[0].schoolCode;
                const atptCode = school.data[0].atptCode;

                setCurrentSchoolCode({
                    code: schoolCode,
                    type,
                });

                const scheduleRes = await getAllSchoolSchedule(
                    schoolCode,
                    atptCode,
                    year,
                    grade
                );

                setSchedules(scheduleRes.data);
            } else if (type === "region") {
                const defaultRegion = "서울특별시 강남구";
                setSelectedRegionName(defaultRegion);
                // console.log("초기 지역 설정:", defaultRegion);
                setSchoolAdress("서울특별시 송파구 송이로 45");

                setCurrentSchoolCode({
                    code: 1,
                    type,
                });

                const scheduleRes = grade
                    ? await searchAverageScheduleByGrade(defaultRegion, grade)
                    : await searchAverageScheduleByGrade(defaultRegion);
                setSchedules(scheduleRes.data.data);
            }

            hasInitialized.current = true; // 초기화 완료
            setIsInitialized(true);
        };

        fetchDefaultSchedule();
    }, [searchType.type, searchType.grade, searchType.year, user]);

    // useEffect(() => {
    //     console.log("🔁 currentSchoolCode 변경됨:", currentSchoolCode);
    // }, [currentSchoolCode]);

    return (
        <ViewContext.Provider
            value={{
                currentView,
                setCurrentView,
                selectedValue,
                setSelectedValue,
                schedules,
                setSchedules,
                currentSchoolCode,
                setCurrentSchoolCode,
            }}>
            {!isInitialized ? <div className={styles.loading}>로딩 중...</div> : children}
        </ViewContext.Provider>
    );
};

export default ViewProvider;
