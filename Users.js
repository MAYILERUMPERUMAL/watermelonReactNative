// models/User.js
import { tableSchema, Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';


class Post extends Model {
  static table = 'posts'
  static associations = {
    comments: { type: 'has_many', foreignKey: 'post_id' },
  }

  @text('title') title
  @text('body') body
  @field('is_pinned') is_pinned
  @text('subtitle')  subtitle
  @field('metadata') meta_data
}

;

export { Post }; // Export both userSchema and User class
