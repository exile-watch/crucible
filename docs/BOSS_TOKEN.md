# Boss Token breakdown

### Keys Definition
| key       | Necessity | type     | description                                                                                                         | Example                                                        |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| map       | optional  | string   | Map name. In case there is no map for the boss (see: `conquerors` or `elder guardians`) then this field is ommited  | Coves                                                          | 
| bosses    | required  | string   | Boss name. Can be multiple                                                                                          | Telvar, the Inebriated                                         |
| abilities | required  | string[] | List of `boss abilities`                                                                                            | Spawn Barrel, Tar                                              |
| type      | optional  | string[] | List of ability damage types.                                                                                       | physical, fire                                                 |
| tip       | required  | string[] | List of Player Interactions to given Ability. `yml` brackets have the same role as dashes.                          | dodge, kill new spawns                                         |
| gif       | required  | string   | Video source. Currently all of the sources are hosted from `http://gyazo.com/`                                      | https://i.gyazo.com/279f86d6f8652e9708cde4a80276223c.mp4       |
| about     | required  | string[] | About ability list. Wrap each sentence with double quotation marks (`""`). In future we may enhance those strings.  | Every couple seconds Telvar throws Barrel at player's position |

---

`coves.yml`
```yml
map: Coves
bosses:
  - Telvar, the Inebriated:
      abilities:
        - Spawn Barrel:
            tip: [ destroy ]
            gif: https://i.gyazo.com/20b4ddbade91f264d18ba8c304d9a19a.mp4
            about:
              - "Every couple seconds Telvar spawns a Barrel at random position"
              - "Once destroyed leaves a pool of Tar"
        - Tar:
            tip: [ move out ]
            gif: https://i.gyazo.com/22602b30cc9cf622a91f1a0c371477d6.mp4
            about:
              - "Being in Tar slows your movement"
        - Throw Barrel:
            type: [ physical ]
            tip: [ dodge ]
            gif: https://i.gyazo.com/279f86d6f8652e9708cde4a80276223c.mp4
            about:
              - "Every couple seconds Telvar throws Barrel at player's position"
        - Alchemy Orb:
            type: [ fire ]
            gif: https://i.gyazo.com/22602b30cc9cf622a91f1a0c371477d6.mp4
            about:
              - "Alchemy Orb leaves a pool of flames"

  - Pirate Treasure:
      abilities:
        - Slam:
            type: [ physical ]
            tip: [ destroy ]
            gif: https://i.gyazo.com/20b4ddbade91f264d18ba8c304d9a19a.mp4
            about:
              - "Performs a deadly slam"
              - "This ability can explode Telvar's Barrel"
        - Whirling Blades:
            tip: [ dodge ]
            gif: https://i.gyazo.com/de274bac97aeea2ad5e7726b7c1250ab.mp4
            about:
              - "Rolls towards player linearly"
              - "This ability can explode Telvar's Barrel"
```