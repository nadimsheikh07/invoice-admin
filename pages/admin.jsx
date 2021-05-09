import AdminLayout from '../component/layout'
import DashboardList from '../component/dashboard';
// import NewsSlider from '../component/news/slider';

const Index = () => {
    return (
        <AdminLayout>
            <DashboardList />
            {/* <NewsSlider/> */}
        </AdminLayout>
    )
}

export default Index