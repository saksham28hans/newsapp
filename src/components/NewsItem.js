import React from 'react';

const NewsItem = (props)=> {
    
        let { title, description, imageUrl, newsUrl, author, publishedAt,source } = props;
        return (
            <div>
                <div className="card">
                    <div style={{display:'flex',justifyContent:'left-end',position:'absolute',right : '0'}}>
                    <span className="badge rounded-pill bg-danger ">
                        {source.name}
                    </span>
                    </div>
                    <img src={imageUrl ? imageUrl : "https://images.livemint.com/img/2022/03/29/600x338/COVID_1648549848870_1648549849163.jpg"} className="card-img-top" alt="..." style={{ widht: 200, height: 200 }} />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} at {new Date(publishedAt).toUTCString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        );
}

export default NewsItem;
