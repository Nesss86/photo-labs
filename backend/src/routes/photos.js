// Import the Express Router to define routes
const router = require("express").Router();

module.exports = db => {
  // Define a GET endpoint for fetching photos
  router.get("/photos", (request, response) => {
    // Dynamically construct the server URL
    const protocol = request.protocol; // HTTP or HTTPS
    const host = request.hostname;    // Hostname (e.g., localhost)
    const port = process.env.PORT || 8001; // Use PORT from environment or default to 8001
    const serverUrl = `${protocol}://${host}:${port}`; // Construct the full server URL

    // Query the database for photo data
    db.query(`
      SELECT 
      json_agg( -- Aggregate results into a JSON array
          json_build_object( -- Build a JSON object for each photo
            'id', photo.id, -- Photo ID
            'urls', json_build_object( -- Build a JSON object for photo URLs
              'full', concat('${serverUrl}/images/', photo.full_url), -- Full-size URL
              'regular', concat('${serverUrl}/images/', photo.regular_url) -- Regular-size URL
            ),
            'user', json_build_object( -- Build a JSON object for user details
              'username', user_account.username, -- User's username
              'name', user_account.fullname, -- User's full name
              'profile', concat('${serverUrl}/images/', user_account.profile_url) -- Profile picture URL
            ),
            'location', json_build_object( -- Build a JSON object for photo location
              'city', photo.city, -- Photo's city
              'country', photo.country -- Photo's country
            ),
            'similar_photos', ( -- Fetch up to 4 similar photos
              SELECT 
                json_agg(
                  json_build_object( -- Build JSON object for each similar photo
                    'id', similar_photo.id,
                    'urls', json_build_object(
                      'full', concat('${serverUrl}/images/', similar_photo.full_url),
                      'regular', concat('${serverUrl}/images/', similar_photo.regular_url)
                    ),
                    'user', json_build_object(
                      'username', similar_user_account.username,
                      'name', similar_user_account.fullname,
                      'profile', concat('${serverUrl}/images/', similar_user_account.profile_url)
                    ),
                    'location', json_build_object(
                      'city', similar_photo.city,
                      'country', similar_photo.country
                    )
                  )
                )
              FROM photo AS similar_photo
              JOIN user_account AS similar_user_account ON similar_user_account.id = similar_photo.user_id
              WHERE similar_photo.id <> photo.id -- Exclude the current photo
              AND similar_photo.topic_id = photo.topic_id -- Match on topic
              LIMIT 4 -- Limit to 4 similar photos
            )
          )
        ) as photo_data -- Alias the aggregated JSON array
      FROM photo -- Main photo table
      JOIN user_account ON user_account.id = photo.user_id; -- Join with user account table
    `).then(({ rows }) => {
      // Respond with the JSON data for all photos
      response.json(rows[0].photo_data);
    });
  });

  // Return the configured router
  return router;
};

