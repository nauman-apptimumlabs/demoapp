class CreateExercises < ActiveRecord::Migration[7.0]
  def change
    create_table :exercises do |t|
      t.references :user, null: false, foreign_key: true
      t.references :youga, null: false, foreign_key: true

      t.timestamps
    end
  end
end
