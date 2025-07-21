import React, { useEffect } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';
const Notification = () => {
    useEffect(() => {
        document.title = "Thông báo • WeSphere"
    }, []);
    return (
        <DefaultLayout>
            <div>Notification Page</div>
        </DefaultLayout>
    )
}
export default Notification