import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <section className="row text-white bg-secondary p-4">
                <div className="col-md-4">
                    <h4 className="text-center">About Us</h4>
                    <div className="p-2">
                        <p>
                            Welcome to Medimart —where passion meets purpose! We are dedicated to bringing you the latest insights, tools, and resources to help you achieve your goals. Our mission is to connect with you, inspire creativity, and make your experience as enjoyable and valuable as possible.
                        </p>
                        <p>
                            Our goal is to create an online space that feels like home—reliable, inspiring, and full of valuable content. We are committed to bringing you the best resources and a supportive community to help you grow and succeed.
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Contact Us</h4>
                    <form action="" className="mt-3">
                        <input type="text" name="" id="" className="form-control mb-3" placeholder="Enter your email" />
                        <textarea name="" id="" placeholder="Leave a message" className="form-control mb-3" rows="5"></textarea>
                        <input type="submit" className="btn btn-warning w-100 fw-bold" value="Send Message" />
                    </form>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Stay Connected</h4>
                    <div className="p-2">
                        <p className="text-white-50">
                            Stay in the loop with our latest updates, exclusive offers, and insider news. Follow us on our journey to better health.
                        </p>
                        <div className="mt-4 text-center">
                            <Link to="https://www.instagram.com/polymerth_" target="_blank" rel="noopener noreferrer">
                                <img src="images/in.png" alt="Instagram" style={{ width: '40px', transition: 'transform 0.3s' }} className="social-icon" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="text-white text-center p-3 bg-dark">
                <p className="mb-0">Developed by Fidel Cedric &copy; 2025. All Rights Reserved</p>
            </footer>
        </div>
    )
}

export default Footer
