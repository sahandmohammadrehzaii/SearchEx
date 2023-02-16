import { getServerSession } from "next-auth"
import mongoClient from "@/utils/db"
import Link from "next/link";
import styles from "./page.module.scss";

// sample intput: 1676435639911
const formarTimeStamp = (timestamp) => {
    const date = new Date(timestamp);

    return date;
}

export default async function Page() {
    const session = await getServerSession();
    const email = session?.user?.email;
    const name = session?.user?.name || session?.user?.email.split('@')[0];

    const client = await mongoClient;
    const db = client.db();

    const searchHistory = await db.collection("history").find({
        email: email
    }).limit(200).toArray();

    return (
        <div className="page">
            <h2> Search History of {name} </h2>

            <div className={styles.history}>
                {searchHistory.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <p>
                            {/* <span className={styles.item__timestamp}>
                                {(item.localTimestamp)}
                            </span> */}
                            <span className={styles.item__query}>
                                {item.query}
                            </span>
                            <span className={styles.item__path}>
                                {item.path}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}