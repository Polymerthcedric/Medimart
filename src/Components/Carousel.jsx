import React from 'react'

const Carousel = () => {
  return (
    <section className="row carousel-container">
    <div className="col-md-12">
        {/* <!-- below div will carry three parts of a carousel -->
        <!-- hold the entire carousel --> */}
        <div className="carousel slide" data-bs-ride="carousel" id="mycarousel">   
            {/* <!-- wrapper starts here --> */}
                <div className="carousel-inner">
                    <div className="carousel-item active carousel">
                        <img src="images/pexels-tara-winstead-7723388.jpg" alt="" className="d-block w-100"/>
                    </div>
                    <div className="carousel-item carousel">
                        <img src="images/pexels-arvind-philomin-187831830-12148417.jpg" alt="" className="d-block w-100"/>
                    </div>
                    <div className="carousel-item carousel">
                        <img src="images/microscope.jpg" alt="" className="d-block w-100"/>
                    </div>
                </div>
                {/* <!-- wrapper ends here -->

                <!-- controllers start here  --> */}
                <a href="#mycarousel" data-bs-slide="prev" className="carousel-control-prev">
                    <span className="carousel-control-prev-icon bg-danger"></span>
                </a>
                <a href="#mycarousel" data-bs-slide="next" className="carousel-control-next">
                    <span className="carousel-control-next-icon bg-danger"></span>
                </a>
        </div>
    </div>
</section>
  )
}

export default Carousel