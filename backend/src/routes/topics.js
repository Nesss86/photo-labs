const router = require("express").Router();

module.exports = (db) => {
  // Fetch all topics
  router.get("/topics", (request, response) => {
    db.query(`
      SELECT 
        topic.id,
        topic.title,
        topic.slug
      FROM topic
    `)
      .then(({ rows: topics }) => {
        response.json(topics);
      })
      .catch((err) => {
        console.error("Error fetching topics:", err);
        response.status(500).json({ error: "Internal server error" });
      });
  });

  // Fetch photos for a specific topic
  router.get("/topics/photos/:id", (request, response) => {
    const protocol = request.protocol;
    const host = request.hostname;
    const port = process.env.PORT || 8001;
    const serverUrl = `${protocol}://${host}:${port}`;

    const topicId = parseInt(request.params.id, 10);

    // Validate the topic ID
    if (isNaN(topicId)) {
      return response.status(400).json({ error: "Invalid topic ID" });
    }

    db.query(`
      SELECT 
        json_agg(
          json_build_object(
            'id', photo.id,
            'urls', json_build_object(
              'full', concat('${serverUrl}/images/', photo.full_url),
              'regular', concat('${serverUrl}/images/', photo.regular_url)
            ),
            'user', json_build_object(
              'username', user_account.username,
              'name', user_account.fullname,
              'profile', concat('${serverUrl}/images/', user_account.profile_url)
            ),
            'location', json_build_object(
              'city', photo.city,
              'country', photo.country
            ),
            'similar_photos', (
              SELECT 
                json_agg(
                  json_build_object(
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
              WHERE similar_photo.id <> photo.id
              AND similar_photo.topic_id = photo.topic_id
              LIMIT 4
            )
          )
        ) AS topic_photo_data
      FROM topic
      JOIN photo ON photo.topic_id = topic.id
      JOIN user_account ON user_account.id = photo.user_id
      WHERE topic.id = $1
    `, [topicId])
      .then(({ rows }) => {
        if (!rows[0]?.topic_photo_data) {
          return response.status(404).json({ error: "No photos found for this topic" });
        }
        response.json(rows[0].topic_photo_data);
      })
      .catch((err) => {
        console.error("Error fetching topic photos:", err);
        response.status(500).json({ error: "Internal server error" });
      });
  });

  return router;
};

