import React, {useEffect,useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {

  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
    
    const updateNews =  async () =>
    {
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(50);
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setloading(false);
        props.setProgress(100);
    }
    useEffect(() => {
      document.title = `${props.category[0].toUpperCase() + props.category.substring(1) } - NewsMonkey `
       updateNews();
       // eslint-disable-line
    }, []);
   
   const fetchMoreData = async()=>{
    
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setpage(page+1);
        setarticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
        setloading(false); 
    }
    return (
      <>
          <h1 className = "text-center" style ={{margin:'35px 0px',marginTop:'90px'}}><center>NewsMonkey - Top {props.category[0].toUpperCase() + props.category.substring(1) } Headlines</center></h1>
          {loading && <Spinner/>}
          <hr/>
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container my-3">
        <div className="row my-3">
      
        {articles.map((element)=>
        {
           return  <div className="col-md-3 my-3" key={element.url}> 
           <NewsItem title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} imageUrl = {element.urlToImage} newsUrl ={element.url} author = {element.author} publishedAt = {element.publishedAt} source = {element.source}/>
           </div>
        })}
        </div>
        </div>
        </InfiniteScroll> 
      </>
    );
    
  
}

News.defaultProps = {
  country : 'in',
  pageSize : 8,
  category : "general"
}
News.propTypes = {
 country : PropTypes.string,
 pageSize : PropTypes.number,
 category : PropTypes.string
}
export default News;
