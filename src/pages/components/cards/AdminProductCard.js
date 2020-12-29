import React from 'react';
import { Card } from 'antd';
import imageDefault from '../../../images/image_1.jpg'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card

const AdminProductCard = ({ product, handleRemove }) => {

    const {
        title,
        price,
        description,
        volume,
        images,
        slug
    } = product
    return (
        <Card
            cover={
                <img src={images && images.length ? images[0].url : imageDefault}
                    style={{ height: '150px', objectFit: "cover" }}
                    className="p-1" />

            }
            actions={[
                <Link to={`/admin/product/${slug}`} >
                    <EditOutlined className="text-warning" />
                </Link>,
                <DeleteOutlined onClick={() => handleRemove(slug)} className="text-danger" />]}
        >
            <Meta title={title} description={description} volume={volume} price={price} />
        </Card>
    )
}

export default AdminProductCard
