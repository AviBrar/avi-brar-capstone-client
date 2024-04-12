import './Teams.scss';

export default function Teams(){

    const id = useParams();
    const teamsURL = process.env.REACT_APP_TEAMS_URL;

    const fetchTeams = async () => {
        const res = await axios.get(teamsURL/)
    }

    return (

    )
}