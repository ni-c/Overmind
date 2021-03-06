import {Task} from '../Task';
import {profile} from '../../profiler/decorator';


export type transferAllTargetType = StructureStorage | StructureTerminal | StructureContainer;

export const transferAllTaskName = 'transferAll';

@profile
export class TaskTransferAll extends Task {

	target: transferAllTargetType;

	constructor(target: transferAllTargetType, options = {} as TaskOptions) {
		super(transferAllTaskName, target, options);
	}

	isValidTask() {
		for (let resourceType in this.creep.carry) {
			let amountInCarry = this.creep.carry[<ResourceConstant>resourceType] || 0;
			if (amountInCarry > 0) {
				return true;
			}
		}
		return false;
	}

	isValidTarget() {
		return _.sum(this.target.store) < this.target.storeCapacity;
	}

	work() {
		for (let resourceType in this.creep.carry) {
			let amountInCarry = this.creep.carry[<ResourceConstant>resourceType] || 0;
			if (amountInCarry > 0) {
				return this.creep.transfer(this.target, <ResourceConstant>resourceType);
			}
		}
		return -1;
	}
}
