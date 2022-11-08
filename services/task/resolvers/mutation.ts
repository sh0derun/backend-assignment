import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const mutation: Resolvers<Context>['Mutation'] = {
  createTask: async (_parent, { input }, ctx) => 
    ctx.prisma.task.create({
      data:{
        position: 0,
        title: input.title,
        list:{
          connect: {
            id: input.listId
          }
        }
      },
      include:{
        list: true
      }
    }),
  
  updateTask: async (_parent, { id, input }, ctx) =>
    ctx.prisma.task.update({
      where: {id},
      data:{
        title: input.title ?? undefined,
        completed: input.status ?? undefined
      }
    }),

  moveTaskToPosition: async (_parent, { position, taskId }, ctx) =>
    ctx.prisma.task.update({
      where:{ id: taskId },
      data:{ position }
    }),

  deleteTask: async (_parent, { id }, ctx) => {
      return await ctx.prisma.task.delete({
        where:{ id }
      }) ? {success:true} : {success:false};
  }
}
