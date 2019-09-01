import React from 'react';
import './App.css';

function SideMenu(){
    const sideMenuEntries = ["Home", "Shop", "About"];
    return(<div className="sideMenu">{sideMenuEntries.map((entry) =><SideMenuEntry value={entry}/>)}</div>)
}
function SideMenuEntry(props){
    return(<div className="sideMenuEntry">{props.value}</div>)
}

class TopNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {menuOpen: false};
        this.openCloseMenu = this.openCloseMenu.bind(this);
    }
    openCloseMenu(){
        this.setState(state => ({menuOpen: !state.menuOpen}));
        this.props.setPage(this.state.menuOpen ? this.props.previousPage : "menu");
    }
    render(){
    return(
        <div className="topNav">{this.props.currentPage}
            <div onClick={this.openCloseMenu} className={this.state.menuOpen ? "menuBtn change" : "menuBtn"}>
                <div className="bar1"></div><div className="bar2"></div><div className="bar3"></div>
            </div>
        </div>
    )}
}

function HomePage(){
    return <div>Welcome to the home page</div>
}
function ShopPage(){
    return <div>Welcome to the shop page</div>
}
function AboutPage(){
    return <div>Welcome to the about page</div>
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: "home",
            previousPage: ""
        }
        this.setPage = this.setPage.bind(this);
    }
    setPage(page){this.setState(() => ({currentPage: page, previousPage: this.state.currentPage}))}
    renderPage(page){
        switch(page){
            case "home":
                return <HomePage></HomePage>
            case "shop":
                return <ShopPage></ShopPage>
            case "about":
                return <AboutPage></AboutPage>
            case "menu":
                return <SideMenu></SideMenu>
            default:
                return <HomePage></HomePage>
        }
    }
    render(){
        return(
        <div className="app">
            <TopNav previousPage={this.state.previousPage} currentPage={this.state.currentPage} setPage={this.setPage}></TopNav>
            <div className="pageContent">{this.renderPage(this.state.currentPage)}</div>
        </div>
        )
    }
}

export default App;