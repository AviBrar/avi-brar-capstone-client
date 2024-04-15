import { useState, useEffect } from 'react';
import './AddTeam.scss';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

export default function AddTeam(){
    
    const navigate = useNavigate();

    const [leagueList, setLeagueList] = useState([]);

    const teamsURL = process.env.REACT_APP_TEAMS_URL;
    const leaguesURL = process.env.REACT_APP_LEAGUES_URL;

    const [league, setLeague] = useState("");
    const [teamName, setTeamName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [managerName, setManagerName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [foundingYear, setFoundingYear] = useState("");
    const [goals, setGoals] = useState("0");
    const [goalsAgainst, setGoalsAgainst] = useState("0");
    const [wins, setWins] = useState("0");
    const [draws, setDraws] = useState("0");
    const [losses, setLosses] = useState("0");

    const handleChangeLeague = (event) => {
        setLeague(event.target.value);
    }
    const handleChangeTeamName = (event) => {
        setTeamName(event.target.value);
    }
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    }
    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    }
    const handleChangeManagerName = (event) => {
        setManagerName(event.target.value);
    }
    const handleChangeDescription = (event) => {
        setTeamDescription(event.target.value);
    }
    const handleChangeContactPhone = (event) => {
        setContactPhone(event.target.value);
    }
    const handleChangeContactEmail = (event) => {
        setContactEmail(event.target.value);
    }
    const handleChangeFoundingYear = (event) => {
        setFoundingYear(event.target.value);
    }

    const isFormValid = (event) => {
        let states = [league, teamName, teamDescription, city, country, managerName, contactPhone, contactEmail, foundingYear];
        let inputs = event.target.elements; //Retrieves the paths for the forms as opposed to the content
        let bool = true; //Declaration of the return value

        for (let i = 0; i < states.length; i++) {
            inputs[i].classList.remove("--invalid"); //Resets the previous invalid formatting on the page
            if (states[i] === "") {       //Enters on invalid type="text" input fields
                inputs[i].classList.add("--invalid");
                bool = false;
            } else if (states[i] === "invalid") {     //Enters on unselected select input fields
                inputs[i].classList.add("--invalid");
                bool = false;
            } else if ((typeof states[i] === "number" && i===3) && states[i] <= 0) {      //Enters only for the quantity field
                inputs[i].classList.add("--invalid");
                bool = false;
            } else if ((states[i] === false && states[i + 1] === false) || (states[i] === false && states[i - 1] === false)) {  //Enters only for the radio fields
                inputs[i].classList.add("--invalid");
                bool = false;
            }
        }
        return bool;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isFormValid(event)) {

            try {
                axios.post(`${teamsURL}`,
                    {
                        team_name: teamName,
                        league_id: league,
                        city: city,
                        country: country,
                        manager_name: managerName,
                        team_description: teamDescription,
                        contact_phone: String(contactPhone),
                        contact_email: contactEmail,
                        founding_year: foundingYear,
                        goals: goals,
                        goals_against: goalsAgainst,
                        wins: wins,
                        draws: draws,
                        losses: losses
                    })
                
                alert("team added");
                navigate('/');
            } catch (error) {
                alert(error); //Sends the error sent from the backend
            }
        }
    }
    const populateLeagues = () => {
        const parent = document.getElementById("teamLeague");
        if (!parent) { //In the event that warehouseList hasn't been populated yet
            return (
                <p>Loading...</p>
            )
        }

        if (parent.childElementCount < leagueList.length) {
            for (let i = 0; i < leagueList.length; i++) {      //Adds an option element for each warehouse that exists
                let opt = document.createElement('option');
                opt.innerHTML = leagueList[i].league_name;
                opt.value = leagueList[i].id;
                parent.appendChild(opt);
            }
        }
    }
    useEffect(() => {
        const getLeagues = async () => { 
            try {
                const res = await axios.get(`${leaguesURL}`);
                setLeagueList(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getLeagues();
    }, []);
    populateLeagues();

    return(
        <>
            <form className='new-team' onSubmit={handleSubmit}>
                <section className='new-team__details'>
                    <h2 className='new-team__details-header'>Team Details</h2>
                    <div className='new-team__details-info'>
                        <label htmlFor='teamName'>Team Name</label>
                        <input 
                            type='text' 
                            id='teamName' 
                            name='teamName' 
                            placeholder='Team Name' 
                            className='new-team__details-text'
                            onChange={handleChangeTeamName}
                            value={teamName}/>
                    </div>
                    <div className='new-team__details-info'>
                        <label htmlFor='teamDescription'>Team Description</label>
                        <textarea 
                            type='text' 
                            id='teamDescription' 
                            name='teamDescription' 
                            placeholder='Team Name' 
                            className='new-team__details-description'
                            onChange={handleChangeDescription}
                            value={teamDescription}/>
                    </div>
                    <div className='new-team__details-info'>
                        <label htmlFor='teamArea'>City</label>
                        <input 
                            name='teamArea' 
                            id='teamArea'
                            className='new-team__details-city'
                            placeholder='Please enter team city'
                            onChange={handleChangeCity}
                            value={city} />
                    </div>
                    <div className='new-team__details-info'>
                        <label htmlFor='teamCountry'>Country</label>
                        <select id="teamCountry" name="teamCountry" className="new-team__details-country" onChange={handleChangeCountry} value={country}>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Åland Islands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'ivoire">Cote D'ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Territories">French Southern Territories</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-bissau">Guinea-bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                            <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                            <option value="Korea, Republic of">Korea, Republic of</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                            <option value="Moldova, Republic of">Moldova, Republic of</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">Russian Federation</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Helena">Saint Helena</option>
                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                            <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-leste">Timor-leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Virgin Islands, British">Virgin Islands, British</option>
                            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                            <option value="Wallis and Futuna">Wallis and Futuna</option>
                            <option value="Western Sahara">Western Sahara</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                    </div>
                    <div className='new-team__details-info'>
                        <label htmlFor='teamLeague'>League</label>
                        <select name='teamLeague' id='teamLeague' className='new-team__details-text dropdown' onChange={handleChangeLeague}>
                            <option value="invalid">
                                Please select
                            </option>
                        </select>
                    </div>
                </section>
                <div className='divider'></div>
                <section className='new-team__contact'>
                    <h2 className='new-team__contact-header'>Contact Info</h2>
                    <div className='new-team__contact-info'>
                        <label htmlFor='managerName'>Manager Name</label>
                        <input 
                            type='text'
                            id='managerName'
                            name='managerName'
                            placeholder='Enter Manager Name'
                            className='new-team__contact-manager'
                            onChange={handleChangeManagerName}
                            value={managerName}/>
                    </div>
                    <div className='new-team__contact-info'>
                        <label htmlFor='contactPhone'>Phone #</label>
                        <input 
                            name='contactPhone'
                            id='contactPhone'
                            type='text'
                            placeholder='+1 (555) 555 5555'
                            className='new-team__contact-phone'
                            onChange={handleChangeContactPhone}
                            value={contactPhone} />
                    </div>
                    <div className='new-team__contact-info'>
                        <label htmlFor='contactEmail'>Email</label>
                        <input 
                            name='contactEmail'
                            id='contactEmail'
                            type='text'
                            placeholder='example@ex.com'
                            className='new-team__contact-email'
                            onChange={handleChangeContactEmail}
                            value={contactEmail} />
                    </div>
                    <div className='new-team__contact-info'>
                        <label htmlFor='foundingYear'>Founding Year</label>
                        <input 
                            name='foundingYear'
                            id='foundingYear'
                            type='text'
                            placeholder='Enter Year of Inception'
                            className='new-team__contact-email'
                            onChange={handleChangeFoundingYear}
                            value={foundingYear} />
                    </div>
                </section>
                <section className='new-team__btns'>
                    <Link to={"/"} className="new-team__btns-cancel">
                        <h3 className='new-team__btns-cancel-text'>Cancel</h3>
                    </Link>
                    <button className='new-team__btns-add' type='submit'>
                        <h3 className='new-team__btns-add-text'>+ Add Team</h3>
                    </button>
                </section>
            </form>
        </>
    )
}