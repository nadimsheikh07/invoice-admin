import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import MenuCollapse from './menuCollapse'
import MenuNode from './menuNode'
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({    
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const Index = ({ items }) => {
    const classes = useStyles();
    const [menu, setMenu] = React.useState([]);
    const [update, setUpdate] = React.useState(false);

    const handleClick = (e) => {
        menu[e] = !menu[e]
        setMenu(menu)
        setUpdate(!update)
    }

    return (
        <React.Fragment>
            {items && items.map((list, listIndex) => {
                return (
                    <List component="nav" className={classes.root} key={`list${listIndex}`} subheader={<ListSubheader component="div">{list.title}</ListSubheader>}>
                        {list.items.map((item, itemIndex) => {
                            return (
                                <div key={`listItemStart${itemIndex}`}>
                                    {item.subitems != null ? (
                                        <MenuCollapse key={`MenuCollapse${item.id}`} menu={menu} item={item} handleClick={handleClick} />
                                    )
                                        : (<MenuNode key={`MenuNode${item.id}`} data={item} />)
                                    }
                                </div>
                            )
                        })}
                        <Divider key={`Divider${listIndex}`} absolute />
                    </List>
                )
            })}
        </React.Fragment>
    );
}

export default Index