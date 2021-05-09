import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon'
import MenuNode from './menuNode'
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const Index = ({ handleClick, menu, item, nested }) => {
    const classes = useStyles();
    const router = useRouter()
    const { t } = useTranslation(["common", "menu"])
    // open menu if location is same
    if (router) {
        if (item) {
            if (item.subitems) {
                item.subitems.forEach(em1 => {
                    if (em1.subitems) {
                        em1.subitems.forEach(em2 => {
                            if (router.pathname.includes(`${em2.link}`)) {
                                menu[em1.id] = true
                                menu[item.id] = true
                            }
                        })
                    } else {
                        if (router.pathname.includes(`${em1.link}`)) {
                            menu[item.id] = true
                        }
                    }
                })
            } else {
                if (router.pathname.includes(`${item.id}`)) {
                    menu[item.id] = true
                }
            }
        }
    }


    return (
        <React.Fragment>
            <ListItem button onClick={() => { handleClick(item.id) }} className={nested ? classes.nested : ''}>
                <ListItemIcon color="inherit"><Icon>{item.icon ? item.icon : 'menu'}</Icon></ListItemIcon>
                
                <ListItemText primary={t(`menu:${item.name}`)} />

                {menu[item.id] ? (<ExpandLess />) : (<ExpandMore />)}
            </ListItem>
            <Collapse
                component='li'
                in={menu[item.id]}
                timeout='auto'
                unmountOnExit
            >
                <List component='nav'>
                    {item.subitems.map(
                        sitem => {
                            return (
                                sitem.subitems != null ? (
                                    <Index key={`SubMenuCollapse${sitem.id}`} menu={menu} classes={classes} item={sitem} handleClick={() => { handleClick(sitem.id) }} nested={true} />
                                )
                                    : (
                                        <MenuNode key={`SubMenuNode${sitem.id}`} data={sitem} nested={true} subNested={nested} />
                                    )
                            )
                        }
                    )}
                </List>
            </Collapse>
        </React.Fragment>
    )
}

export default Index