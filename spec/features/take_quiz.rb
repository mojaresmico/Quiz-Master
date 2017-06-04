require 'rails_helper'

RSpec.describe "take exam" do
   
    it "take quiz" do
        visit "/"
        click_link "Take Quiz", match: :first
        expect(current_path).to eq("/take-quiz")
        expect(page).to have_text("QUIZ")
    end 
end