import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <section className="row text-white bg-secondary p-4">
                <div className="col-md-4">
                    <h4 className="text-center">About Us</h4>
                    <p>
                        Welcome to Medimart —where passion meets purpose! We are dedicated to bringing you the latest insights, tools, and resources to help you achieve your goals. Our mission is to connect with you, inspire creativity, and make your experience as enjoyable and valuable as possible.
                    </p>
                    <p>
                        Welcome to Medimart , where every click leads to something new. Our goal is to create an online space that feels like home—reliable, inspiring, and full of valuable content. We are committed to bringing you the best resources and a supportive community to help you grow and succeed.
                    </p>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Contact Us For more</h4>
                    <form action="">
                        <input type="text" name="" id="" className="form-control product-container" placeholder="Enter your email" /><br />
                        <textarea name="" id="" placeholder="leave a comment" className="form-control" rows="7"></textarea><br />
                        <input type="submit" className="btn btn-outline-warning " value="Send message" name="" id="" /><br />
                    </form>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Stay Connected</h4>
                    <p className="text-dark">
                        Stay in the loop with our latest updates, exclusive offers, and insider news. Sign up today and never miss out!
                        Do not just visit—become a part of our growing community. Stay connected for exclusive content and more
                    </p>
                    <br />
                    <Link to="https://www.facebook.com">
                        <img src="images/fb.png" alt="" />
                    </Link>
                    <Link to="https://www.instagram.com">
                        <img src="images/in.png" alt="" />
                    </Link>
                    <Link to="https://www.x.com">
                        <img src="images/x.png" alt="" />
                    </Link>
                    <br />
                </div>

            </section>
            <footer className="text-white  text-center p-2 footer">
                <h5>Developed by Fidel Cedric.&copy;2025.All Rights Reserved</h5>
            </footer>
        </div>
    )
}

export default Footer