import React from 'react';
import './App.css';

class SideMenu extends React.Component {
    constructor(props){
        super(props);
        this.sideMenuEntries = ["home", "shop", "about"];
    }
    render(){
        return(<div className="sideMenu">{this.sideMenuEntries.map((entry) => <SideMenuEntry key={entry} value={entry} setPage={this.props.setPage} closeMenu={this.props.closeMenu}/>)}</div>)
    }
}

function SideMenuEntry(props){
    function changePage() {
        props.setPage(props.value);
        props.closeMenu();
    };
    return(<div className="sideMenuEntry" onClick={changePage}>{props.value}</div>)
}

function HomePage(){
    return <div>Welcome to the home page</div>
}
function ShopPage(){
    return <div>Shop coming soon...</div>
}
function AboutPage(){
    return <div>Hi my name is Glenn and I make metal tables!</div>
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: "home",
            previousPage: "",
            menuOpen: false
        }
        this.setPage = this.setPage.bind(this);
        this.openCloseMenu = this.openCloseMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    setPage(page){this.setState(() => ({currentPage: page, previousPage: this.state.currentPage}))}
    openCloseMenu(){
        this.setState(state => ({menuOpen: !state.menuOpen}));
        this.setPage(this.state.menuOpen ? this.state.previousPage : "menu");
    }
    closeMenu(){
        this.setState(() => ({menuOpen: false}));
    }
    renderPage(page){
        switch(page){
            case "home":
                return <HomePage></HomePage>
            case "shop":
                return <ShopPage></ShopPage>
            case "about":
                return <AboutPage></AboutPage>
            case "menu":
                return <SideMenu setPage={this.setPage} closeMenu={this.closeMenu}></SideMenu>
            default:
                return <HomePage></HomePage>
        }
    }
    render(){
        return(
        <div className="app">
            <TopNav previousPage={this.state.previousPage} currentPage={this.state.currentPage} setPage={this.setPage} menuOpen={this.state.menuOpen} openCloseMenu={this.openCloseMenu}></TopNav>
            <div className="pageContent">{this.renderPage(this.state.currentPage)}</div>
        </div>
        )
    }
}
class TopNav extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
    return(
        <div className="topNav">{this.props.currentPage}
            <div onClick={this.props.openCloseMenu} className={this.props.menuOpen ? "menuBtn change" : "menuBtn"}>
                <div className="bar1"></div><div className="bar2"></div><div className="bar3"></div>
            </div>
        </div>
    )}
}
export default App;