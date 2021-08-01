import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AuthenticationService from "./AuthenticationService.js";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import TodoDataService from "../../api/todo/TodoDataService.js";
import TodoComponent from "./TodoComponent.jsx"
import moment from "moment";

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent></HeaderComponent>
                    <Switch>
                        <Route path="/" exact component={LoginComponets} />
                        <Route path="/login" component={LoginComponets} />
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                        <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
                        <AuthenticatedRoute path="/todos" component={ListTodosComponent} />
                        <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent></FooterComponent>
                </Router>
                {/* <LoginComponets />
                <WelcomeComponent /> */}
            </div>
        );
    }
}


class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Roghts Reserved 2021 @myTodoApp</span>
            </footer>
        );
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You are logged out</h1>
                <div className="container">Thank you for using our Applicaion.</div>
            </>
        );
    }
}

class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos() {
        TodoDataService.retriveAllTodos(AuthenticationService.getLoggedInUsername())
        .then(
            response => {
               // console.log(response)
               this.setState({todos: response.data})
            }
        )
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUsername()
        //console.log(id, username)
        TodoDataService.deleteTodo(username,id)
        .then(
            response => {
                this.setState({message : `Delete of todo ${id} successful`})
                this.refreshTodos();
            }
        )
        
    }

    updateTodoClicked(id){
        console.log(id)
        this.props.history.push(`/todos/${id}`);    
    }

    addTodoClicked(){
        this.props.history.push('/todos/-1');
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                { this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>Target date</th>
                            <th>Is Completed</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{moment(todo.targetDate).format('DD-MM-YYYY').toString()}</td>
                                <td>{todo.done.toString()}</td>
                                <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                </div>
                </div>
            </div>
        );
    }
}

class WelcomeComponent extends Component {
    render() {
        return (
            <>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome {this.props.match.params.name}. You can manage all Todos{" "}
                <Link to="/todos">here</Link>
            </div>
            </>
        );
    }
}

function ErrorComponent() {
    return (
        <div>
            Um erro ocorreu. Entre em contato com a equipe de suporte @ 7974436629
        </div>
    );
}

class LoginComponets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "myTodoApp",
            password: "",
            hasLoginFailed: false,
            showSuccessfulMessage: false,
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this);
    }

    loginClicked() {
        //myTodoApp
        //dummy
        if (
            this.state.username === "myTodoApp" &&
            this.state.password === "dummy"
        ) {
            //console.log('successful')
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`);
            this.setState({ showSuccessfulMessage: true });
            this.setState({ hasLoginFailed: false });
        } else {
            this.setState({ showSuccessfulMessage: false });
            this.setState({ hasLoginFailed: true });
        }
        // console.log(this.state)
    }

    handleChange(event) {
        // console.log(this.state)
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // handleUsernameChange(event){
    //     console.log(event.target.name)
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    // }

    // handlePasswordChange(event){
    //     this.setState({
    //         [event.target.name]: event.target.password
    //     })
    // }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredential hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {/* <ShowLoginSuccessMesssage showSuccessfulMessage={this.state.showSuccessfulMessage}/> */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {/* {this.state.showSuccessfulMessage && <div>Login Successful</div>} */}
                    User Name :
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button className="btn-btn" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        );
    }
}

// function ShowInvalidCredential(props) {
//         if(props.hasLoginFailed) {
//             return <div>Invalid Credentials</div>
//         }
//     return null
// }

// function ShowLoginSuccessMesssage(props) {
//     if(props.showSuccessfulMessage){
//         return <div>Login Successful</div>
//     }
//     return null
// }

export default TodoApp;
