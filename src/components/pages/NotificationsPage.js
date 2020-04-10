import React from "react";
import "assets/css/NotificationsPage.css";
import CustomLoader from 'components/generic_components/CustomLoader';
import BurgerMenu from '../generic_components/BurgerMenu';
import NotificationsCache from 'caches/notificationsCache/NotificationsCache.js';

class NotificationsPage extends React.Component {

  constructor(props){
    super(props);
  
  this.state = {
    loading: true, //now, in the future will be false
    routes: "",
    comments:  [{title:"Title2", text:"text2"}]
  };
}
  
  componentDidMount() {
    NotificationsCache.getNotifications().then(nots => {
      console.log(nots);
      this.setState({ loading: false, comments: nots });
    });
  }

  viewLoaded = comments => {
    return(
      <div className="bodyRoutes" id="outer-container">
      <main>
          <BurgerMenu 
          pageWrapId="page-wrap"
          container="outer-container"
          />
        <div className="App comments" id="page-wrap">
          <header className="bodyHeader"></header>
          <section className="sectionComments">
            <ul className="listComment">
              {this.state.comments.map((item, index)=>{
                return (
                  <li id={"comment"+index} key={index} className="liComment">
                    <div className="sectionComment">
                        <div className="commentInfo">
                            <p className="header"><i className="fa fas fa-bell"></i>{ item.title}</p>
                            <p className="description">{item.text}</p>
                        </div>
                        <div className="delete">
                            <span><i class="fa fas fa-trash"></i></span>
                        </div>
                    </div>
                  </li>
                );
              })} 
            </ul>
          </section>
        </div>
      </main>
    </div>
    );
    }
  viewCharge = ()=>{
    return(
      <div className="bodyComments" id="outer-container">
        <CustomLoader/>
       </div>
    );
  }
  render(){
    //const {loading} = this.state;

    return ( 
      <React.Fragment>
        {//loading ? <CustomLoader/> : this.viewLoaded(this.state.comments)
        }
        {this.viewLoaded(this.comments)}
      </React.Fragment>
  );
}
}

export default NotificationsPage;
