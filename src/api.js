export class Racer {
    constructor(number) {
        this.number = number;
    }
    async getInfo() {
        try {
            const response = await fetch(`https://api.openf1.org/v1/drivers?driver_number=${this.number}&session_key=latest`);
            const json = await response.json();
            console.log(json[0]);
            if (json.length > 0) {
                
                const fullname = json[0].full_name;
                const url = json[0].headshot_url;
                const team = json[0].team_name;
                return {'fullname': fullname, 'url': url, 'team': team};
            } else {
                console.log("No data found for this racer number.");
                const fullname = "Unknown Racer";
                const url = "";
                const team = "Unknown Team";
                return {'fullname': fullname, 'url': url, 'team': team};
            }
        } catch (error) {
            console.error("Error fetching racer data:", error);
        }
    }
}