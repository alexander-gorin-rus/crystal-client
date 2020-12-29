import React from 'react';
import UserNav from '../components/navigation/UserNav';

const Wishlist = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <UserNav />
                    </div>
                    <div className="col">
                        User Wishlist page
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wishlist
