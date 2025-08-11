// src/pages/Suggestion/TimeRecommendation.jsx
import TimeRecommendationComponent from "../../components/Suggestion/TimeRecommendationComponent";
import styles from "./TimeRecommendation.module.css";

export default function TimeRecommendation() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <TimeRecommendationComponent />
            </div>
        </div>
    );
}
