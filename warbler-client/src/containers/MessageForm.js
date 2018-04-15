import React, {Component} from "react";
import {connect} from "react-redux";
import {postNewMessage} from "../store/actions/messages";

class MessageForm extends Component {
    constructor(props){
        super(props)
        this.state ={
            message:""
        };
    }

    handleNewMessage = event =>{
        event.preventDefault();
        this.props.postNewMessage(this.state.message);
        this.setState({message:""});
        this.props.history.push("/");//react router
    };

    render(){
        return(
            <form onSubmit={this.handleNewMessage}>
                {this.props.errors.message && (
                    <div className="alert alert-danger">
                        {this.props.errors.message}
                    </div>
                )}
                <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.message}
                    onChange={ e => this.setState({message:e.target.value})}
                />
                <button type="submit" className="btn btn-success pull-right" >
                    Add my message
                </button>
            </form>
        )
    }

}

function mapStateToProps(state){
    return {
        errors: state.errors
    };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);
//它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。
//const VisibleTodoList = connect(
 //   mapStateToProps,
 //   mapDispatchToProps
//  )(TodoList)
//mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
//mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。
//使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。


//mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
//如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。

//http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html