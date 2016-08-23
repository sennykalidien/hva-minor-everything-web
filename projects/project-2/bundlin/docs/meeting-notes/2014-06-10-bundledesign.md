# Decisions
* twitter data fully included in user model
* following fields will be replicated to user top level

    * picture (twitter.profile_image_url)
    * name (twitter.name)
    * username (twitter.screen_name)
    * location
    * website (twitter.url)
    * bio (twitter.description)

* build separate functionality to retrieve fresh twitter info

# shared storage
S3?

# Bundle design

## Tags

* tags will be stored as simple texts. When inserting bundle, tags collection will not be updated perse.
* prefilling of user forms will be done based on non-realtime tags collection that is parsed from popular / latest bundles.
