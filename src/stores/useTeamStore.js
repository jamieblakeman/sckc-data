import { defineStore } from "pinia";
import { ref, computed, reactive, toRaw } from "vue";
import { useCurrentTime } from "./useCurrentTime";

const { currentTime } = useCurrentTime();
export const useTeamStore = defineStore("team", () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }

  const state = reactive({
    startTime: null,
    mode: 'review'
  })

  const startClock = () => {
    state.startTime = new Date()
  }

  const secondsElapsed = computed(() => {
    if (state.mode == 'reality' && state.startTime) {
      const time = (currentTime.value - state.startTime)/1000
      return time > 0 ? time + 1 : 0
    } else {
      return null
    }
  })


  const team = ref([
    { name: "Matt Cross" },
    { name: "Matt Clement" },
    { name: "Jenny Blackett" },
    { name: "Grace Jandrall" },
    { name: "Arun Bradley" },
    { name: "Emma Wiggett" },
    { name: "Ricky de Sousa" },
    { name: "Donna Roberts" },
    { name: "Tash Dawson" },
    { name: "Ellie Clements" },
    { name: "Zak Bragg" }

  ]);

  const teamPick = ref([[
    { name: "Matt Cross" },
    { name: "Matt Clement" },
    { name: "Jenny Blackett" },
    { name: "Grace Jandrall" },
    { name: "Arun Bradley" },
    { name: "Emma Wiggett" },
    { name: "Ricky de Sousa" },
    { name: "Donna Roberts" },
    { name: "Tash Dawson" },
    { name: "Ellie Clements" },
    { name: "Zak Bragg" }

  ], []]);

  const log = ref([]);

  const matchStats = computed(() => {
    const scScore = log.value.filter(x => x.action === 'goal').length
    const oppScore = log.value.filter(x => x.action === 'goalOpp').length

    return {scScore: scScore, oppScore: oppScore}
  })

  const teamStats = computed(() => {
    let result = [];
    team.value.forEach((player) => {
      let playerData = log.value.filter((x) => x.playerName === player.name);
      playerData = JSON.parse(JSON.stringify(playerData));
      const goals = playerData.filter((x) => x.action === "goal").length;
      const missed = playerData.filter((x) => x.action === "shot").length;
      const shots = goals + missed;
      result.push({
        name: player.name,
        goals: goals,
        shots: shots,
        missed: missed,
        shootingPercentage: Math.round((goals / shots || 0) * 100)
      });
    });

    return result;
  });

  return {state, count, increment, team, log, teamStats, matchStats, secondsElapsed, startClock, teamPick};
});
