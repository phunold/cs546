# TO - DO
- do we need to define or set any document validation/restrictions for example "balance" not <= 0 or side has to be set to 'over' or 'under'.
- there a missing relation between wager and grandsalami collection, not sure how this is done
- etc.

# Database Proposal

## collections

- users automatically included in global leaderboard (nothing needs to be done by user to enroll in global contests)
- global leader determined for predefined date ranges (monthly, annually, end of a sport season, etc)
- league and global leaderboards updated daily based on account balance

### Users
Stores user information. Users must belong to at least one league, but may belong to more than one league.

```json
{
  "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
	"fname": "Joe",
	"lname": "Doe",
	"email": "jdoe@yahoo.de",
	"passwd": "$4aadffjalkjffasdf",
	"balance": 9999,
	"league_ids": [ ObjectId("4d3ed089fb60ab534684b7f2") ]
	
}
```

| Name        | Type         | Description  |
| ------------- |-------------| -----|
| _id      | string | UUID |
| fname | string      |   first name |
| lname | string      |    last name |
| email | string      |    users email address used for signup and login |
| passwd | string      |    encrypted password |
| balance | float      |    available balance in tokens/points |
| league_ids | string  | list of league the user belongs to|


### Wagers
Stores bet information

```json
{
	"_id": "7b7997a2-c0d2-4f8c-b27a-adf10",
	"user_id": ObjectId("7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310"),
	"timestamp": 1467831475,
	"side": "over"
}
```

| Name        | Type         | Description  |
| ------------- |-------------| -----|
| _id      | string | UUID |
| user_id | string      | reference to user to identify what user made the bet |
| wager_time     | date | timestamp when bet was made |
| side | string | 'over' or 'under' |


### grandsalami

```json
{
"_id": "12fb60ab534685609efefc4b7f2",
"day": ISODate("2016-07-12"),
"grandsalami": 42,
"finalscore": 49,
"over_under": "over"
"status": 'final'
}
```

| Name        | Type         | Description  |
| ------------- |-------------| -----|
| _id      | string | UUID |
| day | date     | date for this Grand salami |
| grandsalami    | float | daily grand salami score |
| finalscore | integer |final daily ending total for sport in focus |
| over_under | string | calculated result 'over' or 'under' or ***p for par*** |
| status  | string | status of the grandsalami 'new', 'open' open for bets, 'closed' closed for bets, 'final' results are final|

### leagues
Stores the league the users belong to. Leagues will be formed with max of 10 users.

```json
{
	"_id": "4d3ed089fb60ab534684b7f2",
	"name": "Super Heros",
	"user_ids":[ 
	 { ObjectId("7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310"),
	   ObjectId("123bce14-a0d2-1234-c12c-12345ef00cab1")
	 }
	]
}
```
