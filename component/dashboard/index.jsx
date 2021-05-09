import { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardHeader, CssBaseline, Grid, Icon } from "@material-ui/core"
import FullPageLoader from '../fullPageLoader';
import { apiConfig } from "../../config/api";
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter()
    const [items, setItems] = useState([])

    const getData = async () => {
        await apiConfig.get('dashboard').then((response) => {
            if (response.status === 200) {
                setItems(response.data)
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])


    const goToPage = (path) => {
        router.push(path)
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={2} style={{ marginTop: 10, marginBottom: 10 }}>
            <CssBaseline />
            {items && items.map((item) => {
                return (
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={`dashLink${item.url}`}>
                        <Card>
                            <CardHeader titleTypographyProps={{ variant: 'h6', }} subheaderTypographyProps={{ variant: 'h6', }} title={item.title} subheader={item.total} avatar={<Icon size={20}>{item.icon}</Icon>} />
                            <CardActions>
                                <Button onClick={() => goToPage(item.url)}>Read more...</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}

            {items && items.length <= 0 && <FullPageLoader text="Loading..." />}
        </Grid>

    )
}

export default Index