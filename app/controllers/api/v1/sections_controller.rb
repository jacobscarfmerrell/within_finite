class Api::V1::SectionsController < ApplicationController
  def index
    @sections = Section.all
    @rhythms = Rhythm.all
    @section_rhythms = SectionRhythm.all
    render json: {
      sections: @sections,
      rhythms: @rhythms,
      section_rhythms: @section_rhythms
    }
  end
end
