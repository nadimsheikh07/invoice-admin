import { blue, green, red } from '@material-ui/core/colors';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { useState } from 'react';
const Index = () => {
    const [open, setState] = useState(true)
    return (
        <AutoRotatingCarousel
            label='Get started'
            open={open}
            onClose={() => setState(false)}
            onStart={() => setState(true)}            
        >
            <Slide
                media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}
                mediaBackgroundStyle={{ backgroundColor: red[400] }}
                style={{ backgroundColor: red[600] }}
                title='This is a very cool feature'
                subtitle='Just using this will blow your mind.'
            />
            <Slide
                media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' />}
                mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                style={{ backgroundColor: blue[600] }}
                title='Ever wanted to be popular?'
                subtitle='Well just mix two colors and your are good to go!'
            />
            <Slide
                media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
                mediaBackgroundStyle={{ backgroundColor: green[400] }}
                style={{ backgroundColor: green[600] }}
                title='May the force be with you'
                subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.'
            />
        </AutoRotatingCarousel>
    )
}

export default Index