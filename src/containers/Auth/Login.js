import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from '../../store/actions';
import './Login.scss';
import { handleLogin } from '../../services/userService';
import { withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl'


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isShowPassword: false,
            err: ''
        };
    }

    validateInput = () => {
        const { language } = this.props
        if (this.state.email === "")
            return {
                errCode: 1,
                errMessage: language === 'vi' ? "Email không được để trống" : "Mising required email parameter!"
            }
        if (this.state.password === "")
            return {
                errCode: 1,
                errMessage: language === 'vi' ? "Mật khẩu không hợp lệ" : "Mising required password parameter!"
            }
        return {
            errCode: 0
        }
    }


    submit = async () => {
        const { email, password } = this.state
        this.setState({ err: "" })
        let validate = this.validateInput()
        if (validate.errCode !== 0) {
            this.setState({ err: validate.errMessage })
            return
        }
        try {
            let data = await handleLogin(email, password)
            if (data && data.errCode !== 0) {
                this.setState({ err: data.message })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                this.setState({ err: err.response.data.message })
            }
        }
    }

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    onKeyPress = (e) => {
        if (e.charCode === 13)
            this.submit()
    }

    handleChangeText = (e) => {
        const { name, value } = e.target
        let cpState = this.state
        cpState[name] = value
        this.setState(cpState)
    }

    render() {
        const { email, password, isShowPassword, err } = this.state
        const { language } = this.props

        return (
            <div className="login-bg">
                <div id="loginform">
                    <div id="form_login">
                        <h2 id="headerTitle">
                            {language === 'vi' ? "Đăng nhập" : "Sign in"}
                        </h2>
                        <div className="form-group rowWapper">
                            <label>
                                Email
                            </label>
                            <input
                                placeholder="email"
                                id="username"
                                name="email"
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={this.handleChangeText}
                                onKeyPress={this.onKeyPress}
                            />
                        </div>
                        <div className="form-group rowWapper">
                            <label>
                                {language === 'vi' ? "Mật khẩu" : "Password"}
                            </label>
                            <input 
                                placeholder={language === 'vi' ? "Mật khẩu" : "Password"}
                                name="password"
                                type={isShowPassword ? "text" : "password"}
                                className="form-control"
                                value={password}
                                onChange={this.handleChangeText}
                                onKeyPress={this.onKeyPress}
                            />
                            <span
                                onClick={this.handleShowPassword}
                                className="eye-icon"
                            >
                                <i className={isShowPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                            </span>
                        </div>

                        {err && (
                            <div className='error'>
                                <span className='login-error-message'>{err}</span>
                            </div>
                        )}
                        <div style={{ height: '30px' }} />
                        <div className="btn btn-login">
                            <button
                                onClick={this.submit}
                                className="btn"
                            >{language === 'vi' ? "Đăng nhập" : "Sign in"}</button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};



const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
