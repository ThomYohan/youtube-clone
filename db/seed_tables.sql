create table user_info (
    user_id serial primary key,
    first_name varchar(50),
    last_name varchar(50),
    auth_id text,
    user_img text,
    email text,
    channel_name varchar(50)
);

create table video (
    video_id serial primary key,
    video_url text,
    user_id integer references user_info (user_id) ON DELETE CASCADE,
    category varchar(50),
    title varchar(50),
    video_desc text,
    view_count integer,
    thumbnail text
);

create table comment (
    comment_id serial primary key,
    video_id integer references video (video_id) ON DELETE CASCADE,
    comment text,
    user_id integer references user_info (user_id) ON DELETE CASCADE,
    parent_id integer
);

create table likes (
    like_id serial primary key,
    user_id integer references user_info (user_id) ON DELETE CASCADE,
    liked boolean,
    video_id integer references video (video_id) ON DELETE CASCADE
);

create table subscription (
    user_id integer references user_info (user_id) ON DELETE CASCADE,
    subscriber_id integer references user_info (user_id) ON DELETE CASCADE
);