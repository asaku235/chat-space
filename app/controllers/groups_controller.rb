class GroupsController < ApplicationController
  def edit
  end

  def update
  end

  def show
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.create(groups_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  private
  def groups_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end
end
