import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { selectCurrentUser, selectUserError, selectUserIsLoading } from "../../store/user/selectors";
import CartButton from "../Cart/CartButton/CartButton";
import CartDropdown from "../Cart/CartDropdown/CartDropdown";
import classes from "./Header.module.scss";
import { userActions } from "../../store/actions";

const Header = ({ currentUser, onSignout }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const checkoutPath = '/checkout';

    const dropdownToggleHandler = () => setIsDropdownOpen(!isDropdownOpen);

    const checkoutHandler = () => {
        //close drpdwn
        dropdownToggleHandler();
        //avoid pushing the same path multiple time
        if (location.pathname !== checkoutPath) {
            history.push(checkoutPath)
        }
    }

    //use ref to close dropdown on click outside of its container
    const dropdownRef = useRef(null);
    const handleClickAway = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickAway);
        //unbind mousedown listener
        return () => {
            document.removeEventListener("mousedown", handleClickAway);
        }
    })

    return (
        <div className={classes.header}>
            <Link to="/" className={classes.logoContainer}>
                <Logo className={classes.logo} />
            </Link>
            <nav className={classes.navLinks}>
                <Link to="/shop" className={classes.navLink}>SHOP</Link>
                <Link to="/shop" className={classes.navLink}>CONTACT</Link>
                {
                    currentUser ? (
                        <Link to="/auth" className={classes.navLink} onClick={onSignout}> SIGN OUT </Link>
                    ) : (<Link to="/auth" className={classes.navLink}>SIGN IN</Link>)
                }
                <div className="container" ref={dropdownRef}>
                    <CartButton dropdownToggleHandler={dropdownToggleHandler} />
                    {isDropdownOpen && <CartDropdown checkoutHandler={checkoutHandler} />}
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    error: selectUserError, 
    isLoading: selectUserIsLoading
})

const mapDispatchToProps = dispatch => ({
    onSignout: () => dispatch(userActions.signout()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);