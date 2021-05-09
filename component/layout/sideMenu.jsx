import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Icon, IconButton } from '@material-ui/core';
import { useRouter } from 'next/router'

import { removeToken } from '../../config/_helpers';
import { useTranslation } from 'react-i18next';

const Index = () => {
    const router = useRouter()
    const { t } = useTranslation(["translation", "menu"])
    const [langMenu, openLangMenu] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [locales, setLocales] = React.useState([]);
    const open = Boolean(anchorEl);
    const openLang = Boolean(langMenu);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        removeToken()
        handleClose()
        router.push('/login')
    }

    // const goToPage = (path) => {
    //     handleClose()
    //     router.push(`/${path}`)
    // }

    const changeLang = (lang) => {
        location.replace(`/${lang}`)
    }

    React.useEffect(() => {
        setLocales(router.locales)
    }, [router])

    return (
        <React.Fragment>
            <IconButton aria-controls="fade-menu" aria-haspopup="true" onClick={logOut} color="inherit">
                <Icon>power_settings_new</Icon>
            </IconButton>


            <IconButton aria-controls="lang-menu" aria-haspopup="true" onClick={(event) => openLangMenu(event.currentTarget)} color="inherit">
                <Icon>language</Icon>
            </IconButton>

            <Menu
                id="lang-menu"
                anchorEl={langMenu}
                keepMounted
                open={openLang}
                onClose={() => openLangMenu(null)}
                TransitionComponent={Fade}
            >
                {locales && locales.map((locale) => {
                    return (
                        <MenuItem onClick={() => changeLang(locale)}>{t(locale)}</MenuItem>
                    )
                })}
            </Menu>

            {/* <IconButton aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
                <Icon>person</Icon>
            </IconButton>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => goToPage('profile')}>My Profile</MenuItem>
                <MenuItem onClick={() => goToPage('change_password')}>Change Password</MenuItem>
                <MenuItem onClick={() => logOut()}>Logout</MenuItem>
            </Menu> */}
        </React.Fragment>
    )
}

export default Index