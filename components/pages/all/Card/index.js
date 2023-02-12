"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import CardSkeleton from "../CardSkeleton";
import styles from "./card.module.scss"

const ResultCard = () => {

    const searchParams = useSearchParams();
    const q = searchParams.get("q");

    const [cardData, setCardData] = useState(null);

    useEffect(() => {
        const fetchCardData = async () => {
            const response = await fetch(`/api/card?q=${q}`)
                .then((response) => response.json())

            setCardData(response);
        }

        fetchCardData();
    }, [q]);

    return (
        <div>
            {cardData ? (
                <div className={styles.card}>
                    <div className={styles.card__body}>
                        {cardData.image && <img src={cardData.image} />}
                        <h1 className={styles.title} >{cardData.title}</h1>
                        <p className={styles.description} >{cardData.description}</p>
                        <p className={styles.content} dangerouslySetInnerHTML={{ __html: cardData.content }} />
                    </div>
                </div>
            ) : (
                <CardSkeleton />
            )}
        </div>
    )
}

export default ResultCard;