import { CircularProgress, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    paper: {
        textAlign: 'center',        
        padding: theme.spacing(2, 4, 3),
    },
    loaderText: {
        marginLeft: 10
    }
}));

const Index = ({ text }) => {
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <CircularProgress color="inherit" />
            <p className={classes.loaderText}>{text}</p>
        </div>
    )
}

export default Index