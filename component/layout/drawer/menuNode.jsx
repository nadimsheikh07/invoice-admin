import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    subNested: {
        paddingLeft: theme.spacing(6)
    },
}));

const Index = ({ nested, subNested, data }) => {
    const router = useRouter()
    const { t } = useTranslation(["common", "menu"])
    const { name, icon, link } = data

    const classes = useStyles();

    let nestedClass = ''
    if (nested) {
        nestedClass = classes.nested
    }

    if (subNested) {
        nestedClass = classes.subNested
    }

    const goToLink = (link) => {
        router.push(link)
    }

    return (
        <React.Fragment>
            <ListItem button className={nestedClass} onClick={() => goToLink(link)}>
                <ListItemIcon className={classes.icon}  color="inherit"><Icon color="inherit">{icon ? icon : 'menu'}</Icon></ListItemIcon>
                <ListItemText primary={t(`menu:${name}`)} />
            </ListItem>
        </React.Fragment>
    );
}

export default Index