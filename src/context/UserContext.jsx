import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userProficiencyScore, setUserProficiencyScore] = useState(0);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [weakPoints, setWeakPoints] = useState([]);

    const completeLesson = (lessonId) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons([...completedLessons, lessonId]);
            // Simple logic to increase score
            setUserProficiencyScore((prev) => Math.min(prev + 5, 100));
        }
    };

    const addWeakPoint = (vocabId) => {
        if (!weakPoints.includes(vocabId)) {
            setWeakPoints([...weakPoints, vocabId]);
        }
    };

    const removeWeakPoint = (vocabId) => {
        setWeakPoints(weakPoints.filter((id) => id !== vocabId));
    };

    return (
        <UserContext.Provider
            value={{
                userProficiencyScore,
                completedLessons,
                weakPoints,
                completeLesson,
                addWeakPoint,
                removeWeakPoint,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
